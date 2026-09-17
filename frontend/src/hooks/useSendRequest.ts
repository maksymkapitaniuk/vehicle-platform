import { useState } from 'react';
import axios, { type Method, type AxiosResponse } from 'axios';
import { ADMINS_API_URL, USERS_API_URL, VEHICLES_API_URL } from '../util/api';
import { processHttpError, AppError } from '../util/errors';
import type { RequestTarget } from '../util/requestTarget';
import { getAdminToken } from '../util/auth';

export interface RequestOptions {
  requestTarget: RequestTarget;
  method: Method;
  onAuthError?: (() => void) | undefined;
}

export interface SendRequestProps {
  data?: unknown;
  entityId?: string | number | undefined;
}

function getRequestUrlBase(requestTarget: RequestTarget) {
  switch (requestTarget) {
    case 'admin':
      return `${ADMINS_API_URL}/admins`;
    case 'user':
    case 'users':
      return `${USERS_API_URL}/users`;
    case 'vehicle':
    case 'vehicles':
      return `${VEHICLES_API_URL}/vehicles`;
    default:
      throw new AppError(
        `Invalid parameter value in method "getRequestUrlBase". Paramer name - "requestTarget". Expected type - "RequestTarget". Received value - "${requestTarget}"`,
        { errorCode: 'internal_client_error' },
      );
  }
}

export function useSendRequest({
  requestTarget,
  method,
  onAuthError,
}: RequestOptions) {
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const urlBase = getRequestUrlBase(requestTarget);

  async function sendRequest({ data, entityId }: SendRequestProps) {
    setLoading(true);
    setError(null);

    let url = urlBase;
    if (entityId) {
      url += '/' + entityId;
    }

    try {
      const token = getAdminToken();

      const axiosResponse = await axios.request({
        url,
        method,
        data,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setResponse(axiosResponse);
    } catch (err) {
      setError(processHttpError(err, { requestTarget, onAuthError }));
      setResponse(null);
    } finally {
      setLoading(false);
    }
  }

  return { sendRequest, response, loading, error };
}
