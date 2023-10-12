export default async function deleteRequest(url) {
    const response = await fetch(url, {
        method: "DELETE",
    });
    return response;
}