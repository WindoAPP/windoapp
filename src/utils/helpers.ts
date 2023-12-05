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

export const generateQueryParams = (
  params: Record<string, string | number>
) => {
  const queryParams = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');

  return queryParams;
};

export function formatStripePrice(priceInCents, currency = 'EUR') {
  // Convert price to a decimal value
  const priceInDecimal = priceInCents / 100;

  // Format the price using Intl.NumberFormat
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(priceInDecimal);

  return formattedPrice;
}

// Example usage:
const priceInCents = 1500; // 15.00 EUR in cents
const formattedPrice = formatStripePrice(priceInCents, 'EUR');
console.log(formattedPrice); // Output: €15.00
