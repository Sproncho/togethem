import error from "./error404.jpg"

export default function ErrorPage() {
    return (
        <div>
            <img src={error} alt="404"/>
        </div>
    )
}