import HeaderBar from './HeaderBar'

const LayoutMobile = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div>
            <HeaderBar />
            {children}
        </div>
    )
}

export default LayoutMobile