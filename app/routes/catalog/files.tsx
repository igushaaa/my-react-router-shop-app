
export async function loader({params}: any) {
    return {rest: params["*"]};
}

export default function Files({ loadeData }: any) {
    return (
        <main>
            <h1> Files</h1>
            <p> Path: {loadeData.rest}</p>
        </main>
    );
}