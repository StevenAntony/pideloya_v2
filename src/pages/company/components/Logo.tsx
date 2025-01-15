import { Upload, message } from 'antd'
import React, { useEffect, useState } from 'react'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useAuthContext } from '../../../contexts/AuthContext'
import { CompanyModel } from '../../../models/CompanyModel'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export default function Logo({
    company,
    changeLogo
}: {
    company: CompanyModel;
    changeLogo: (e: string) => void;
}) {

    const [imageUrl, setImageUrl] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const { auth } = useAuthContext()

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    )

    const getBase64 = (img: FileType, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    }

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          if (info.file.response.success) {
            changeLogo(info.file.response.data.url)
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
              });
          }else{
            message.error(info.file.response.message)
          }

        }
    }

    useEffect(() => {
        setImageUrl(company.logo)
    },[company])

    return (
        <Upload
            action="/api/company/logo"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            headers={{
                Authorization: `Bearer ${auth.token}`
            }}
        >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
    )
}
