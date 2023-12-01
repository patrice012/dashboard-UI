export default async function postRequest(url, data = {}) {
    if (data == {}) throw new Error("Data is empty");
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    return response;
}
