import { useCallback } from 'react';

import { useHttpClient } from '../hooks/http-hook';

const { sendRequest } = useHttpClient();

// GET RANDOM 12 STOCKS
export const fetchRandomMultipleStocks = useCallback(
  async (token: string | null) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/stocks/random-multiple`,
        'GET',
        null,
        {
          Authorization: 'Bearer ' + token,
        }
      );
      return responseData;
    } catch (err) {}
  },
  [sendRequest]
);

// POST STOCK
export const postStock = async (
  formState: any,
  token: string | null,
  e:
    | React.FormEvent<HTMLFormElement>
    | React.MouseEvent<HTMLButtonElement, MouseEvent>
): Promise<void> => {
  e.preventDefault();

  try {
    await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/stocks`,
      'POST',
      JSON.stringify({
        if: formState.inputs.if.value,
        then: formState.inputs.then.value,
        color: formState.inputs.color.value,
      }),
      {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      }
    );

    alert('saved 😉');
  } catch (err) {}
};
