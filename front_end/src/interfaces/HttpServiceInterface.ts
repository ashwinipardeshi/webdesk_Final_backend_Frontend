export type RequestType =
  | 'GET'
  | 'POST'
  | 'DELETE'
  | 'PUT'
  | 'PATCH'
  | 'OPTIONS'
  | 'HEAD';

export type GetDataProps = {
  url: string;
  headers?: any;
  csvFileName?: any;
};
export interface GetMethodProps extends GetDataProps {
  method: 'GET';
}
export interface PostDataProps extends GetDataProps {
  body?: any;
}
export interface PostMethodProps extends PostDataProps {
  method: 'POST';
}

export interface PutDataProps extends PostDataProps {}
export interface PutMethodProps extends PutDataProps {
  method: 'PUT';
}
export interface DeleteDataProps extends GetDataProps {
  body?: any;
}
export interface DeleteMethodProps extends DeleteDataProps {
  method: 'DELETE';
}

export interface PatchDataProps extends GetDataProps {
  body: any;
}
