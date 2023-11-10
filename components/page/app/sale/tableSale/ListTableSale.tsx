import { BorderOuterOutlined, UserOutlined } from '@ant-design/icons'

const ListTableSale = ({
    table,
    showDrawerTableOrderInformation
}:{
    table: ITable;
    showDrawerTableOrderInformation: (id: number) => void
}) => {

    return (
        <div className='flex justify-center relative cursor-pointer'
            onClick={() => showDrawerTableOrderInformation(table.id)}
        >
            <div className='text-center relative'>
                <div className='text-center top-4 px-2 w-full absolute bg-white font-black text-[--color-app-500] text-xl'>
                    {table.description}
                </div>
                <BorderOuterOutlined 
                    className='md:text-9xl text-8xl'
                    style={{
                        background: table.state == 'Libre' ? '' : '#ff2c53',
                        color: table.state == 'Libre' ? '' : '#fff'
                    }}
                />
                <div className={`flex justify-center font-medium text-slate-600 ${table.state == 'Libre' ? '!text-slate-400' : ''}`}>
                    {  table.state != 'Libre' && <UserOutlined className='mr-2' /> }
                    {
                        table.state == 'Libre' ? 'Libre' : table.nameUser
                    }
                </div>
            </div>
        </div>
    )
}

export default ListTableSale