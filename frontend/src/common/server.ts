const server = {
  host: 'italo.williandrade.me/backend',
  uploadFile: (blobValue: Blob, filename?: string) => {
    const formdata = new FormData();
    formdata.append('file', blobValue, filename);

    const requestOptions: RequestInit = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    return fetch(`https://${server.host}/upload`, requestOptions);
  },
  toExcel: (data: any) => {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      redirect: 'follow',
    };

    return fetch(`https://${server.host}/toExcel`, requestOptions);
  }
};

export default server;
