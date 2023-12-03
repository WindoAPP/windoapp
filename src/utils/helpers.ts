export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_BASE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_BASE_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

export const postData = async <T extends any>({
  url,
  data,
}: {
  url: string;
  data?: T;
}) => {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
    {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    console.log('Error in postData', { url, data, res });

    throw Error(res.statusText);
  }

  return res.json();
};

export const toDateTime = (secs: number) => {
  var t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};
