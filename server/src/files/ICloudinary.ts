export interface ICloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

export interface ICloudinary {
  upload: (path: string, publicId: string) => Promise<ICloudinaryUploadResult>;
  delete: (publicId: string) => Promise<any>;
}
