import './loading.css'

export default function LoadingApp({
    screen = true
}:{
    screen?: boolean
}) {

    return <div className={`container-loader ${!screen && '!h-full'}`} >
              <div className="loader"></div>      
          </div>
}