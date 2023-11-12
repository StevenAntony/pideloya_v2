import HeaderBar from './HeaderBar'

const LayoutMobile = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div>
            <HeaderBar />
            <div className='py-4'>
                {children}
            </div>
        </div>
    )
}

export default LayoutMobile