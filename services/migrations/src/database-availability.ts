import environment from "./environment";
import waitOn from "wait-on";

export default async function databaseResponse(
  errorCallback: (error: Error) => void
) {
  try {
    await waitOn({
      resources: [
        `tcp:${environment.DATABASE_ADDRESS}:${environment.DATABASE_PORT}`
      ]
    });
  } catch (error) {
    errorCallback(error);
  }
}
