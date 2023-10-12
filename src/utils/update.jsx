export default async function putRequest(url, data) {
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data)
    });

    const jsonData = await response.json()
    return jsonData;
}
