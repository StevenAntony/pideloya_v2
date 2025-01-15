import React, { useState } from 'react'
import { Typography , Dropdown, message, Modal, Upload, Button } from 'antd'
import { CloudDownloadOutlined, CloudUploadOutlined, DownloadOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import ProductService from '../../service/ProductService'
import { useAppContext } from '../../contexts/AppContext'
import { QueueService } from '../../service/QueueService'

const { Title } = Typography

const items = [
    {
      key: 'export',
      disabled: true,
      label: <><CloudDownloadOutlined /> Exportar</>,
    },
    {
      key: 'import',
      label:  <><CloudUploadOutlined /> Importar</>,
    },
    {
      key: 'download-template',
      label: <><DownloadOutlined /> Plantilla</>,
    }
]


const ProductHead = ({
    setOpen,
    setEditMaintainerDrawer,
    disableButton,
    reload
  }) => {
    let getStatusQueue

    const [isModalOpen, setModalOpen] = useState(false)
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false)

    const { queueProgressApp } = useAppContext()

    const downloadTemplateProduct = async () => {
        message.loading('Descargando Plantilla')
        const response = await ProductService.downloadTemplate()
        if (response.success) {
            window.location.href = response.data.url
        }else{
            message.error(response.message)
        }
        message.destroy()
    }

    const statusQueue = async (queueID) => {
        const service = new QueueService()
        await service.show(queueID)
        const response = service.getResponse()
        let description = null
        if (response.success) {
            const data = response.data
            if (data.status == 'success' || data.progress >= 100) {
                description = data.status == 'success' ? 'Productos Importados correctamente' : 'Hubo un problema en importar algunos productos'
                clearInterval(getStatusQueue)
                reload()
            }
            queueProgressApp.updatedQueue(queueID, { ...response.data, description: description })
        }else{
            message.error(response.message)
            clearInterval(getStatusQueue)
            reload()
        }
    }

    const handleUpload =async () => {
        setUploading(true)
        message.loading('Subiendo archivo')
        const response = await ProductService.importExcel(fileList[0])
        if (response.success) {
            const data = response.data
            queueProgressApp.addQueue({
                id: data.id,
                name: 'import-product',
                progress: data.progress,
                result: data.result,
                title: 'Importando Productos',
                show: true,
                status: data.status
            })
            statusQueue(data.id)
            getStatusQueue = setInterval(() => {
                statusQueue(data.id)
            }, 3000);
            message.destroy()
            message.success('Archivo subido correctamente')
            // reload()
        }else{
            message.error(response.message)
        }
        setModalOpen(false)
        setUploading(false)
      }

    const onMenuClick = (e) => {
        if (e.key == 'download-template') {
            downloadTemplateProduct()
        }else if (e.key == 'import') {
            setModalOpen(true)
        }
    }

    const props = {
        onRemove: (file) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          setFileList(newFileList);
        },
        beforeUpload: (file) => {
            if (fileList.length >= 1) {
                return false
            }
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
        accept: '.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }

    return (
        <div className="p-8 pb-0 flex justify-between">
            <Title level={3}>Productos</Title>
            <div>
                <Dropdown.Button
                    menu={{ items, onClick: onMenuClick }}
                    onClick={() => {
                        setOpen(true)
                        setEditMaintainerDrawer(false)
                    }}
                    type='primary'
                    disabled={disableButton}
                >
                    <PlusOutlined /> Nuevo
                </Dropdown.Button>
            </div>
            <Modal title="Importar Productos" open={isModalOpen} footer={null} onCancel={() => {
                setModalOpen(false)
                setFileList([])
            }}>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Seleccione Archivo</Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{
                        marginTop: 16,
                    }}
                >
                    {uploading ? 'Subiendo' : 'Importar'}
                </Button>
            </Modal>
        </div>
    )
}

export default ProductHead
