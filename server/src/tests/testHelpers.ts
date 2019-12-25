import { ObjectId } from "mongodb";

export function asStringId(value?: string | number | ObjectId) {
  if (!value) {
    value = new ObjectId();
  }

  if (!(value as ObjectId).toHexString) {
    value = new ObjectId(value);
  }

  return (value as ObjectId).toHexString();
}
