import { BorderOuterOutlined, UserOutlined } from '@ant-design/icons'

const DetailTable = ({
    table
}:{
    table: ITable
}) => {
    return (
        <div className='flex justify-center'>
            <div className='text-center'>
                <div className='text-center'>{table.description}</div>
                <BorderOuterOutlined 
                    style={{
                        fontSize:'60px',
                        background: table.state == 'Libre' ? '' : '#ff2c53',
                        color: table.state == 'Libre' ? '' : '#fff'
                    }}
                />
                <div className={`flex justify-center font-semibold text-slate-600 ${table.state == 'Libre' ? '!text-slate-400' : ''}`}>
                    {  table.state != 'Libre' && <UserOutlined className='mr-2' /> }
                    {
                        table.state == 'Libre' ? 'Libre' : table.nameUser
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailTable