export async function fetchWrapper(url, options = {}) {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type');
    const hasBody = contentType && contentType.includes('application/json');
    const data = hasBody ? await res.json() : null;
    if (!res.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
  
    return data;
  }
  