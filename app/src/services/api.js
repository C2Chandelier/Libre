import fetchRetry from "fetch-retry";
import { apiURL } from "../config";

let fetch = window.fetch;

class api {
  constructor() {
    this.token = "";
  }

  goToAuth(navigation) {
    if (navigation?.route?.name !== "Auth") {
      return navigation.navigate("Auth", { disconnected: 1 });
    }
  }
  getToken() {
    return this.token;
  }

  setToken(token) {
    this.token = token;
  }

  checkToken(navigation) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${apiURL}/user/signin_token`, {
          retries: 3,
          retryDelay: 1000,
          retryOn: [502, 503, 504],
          mode: "cors",
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${this.token}`,
          },
        });
        if (response.status === 401) {
          this.goToAuth(navigation);
        }
        const res = await response.json();
        resolve(res);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  get(path, navigation) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${apiURL}${path}`, {
          retries: 3,
          retryDelay: 1000,
          retryOn: [502, 503, 504],
          mode: "cors",
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${this.token}`,
          },
        });
        if (response.status === 401) {
          this.goToAuth(navigation);
        }
        const res = await response.json();
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  }

  put(path, body, navigation) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${apiURL}${path}`, {
          retries: 3,
          retryDelay: 1000,
          retryOn: [502, 503, 504],
          mode: "cors",
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${this.token}`,
          },
          body: typeof body === "string" ? body : JSON.stringify(body),
        });
        if (response.status === 401) {
          this.goToAuth(navigation);
        }
        const res = await response.json();
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  }

  remove(path, navigation) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${apiURL}${path}`, {
          retries: 3,
          retryDelay: 1000,
          retryOn: [502, 503, 504],
          mode: "cors",
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${this.token}`,
          },
        });
        if (response.status === 401) {
          this.goToAuth(navigation);
        }
        const res = await response.json();
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  }

  post(path, body, navigation) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${apiURL}${path}`, {
          retries: 3,
          retryDelay: 1000,
          retryOn: [502, 503, 504],
          mode: "cors",
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${this.token}`,
          },
          body: typeof body === "string" ? body : JSON.stringify(body),
        });
        if (response.status === 401) {
          this.goToAuth(navigation);
        }
        const res = await response.json();
        if (response.status !== 200) {
          return reject(res);
        }
        resolve(res);
      } catch (e) {
        console.log(e, { extra: { path: path, body: body } });
        reject(e);
      }
    });
  }
}
function initApi() {
  fetch = fetchRetry(window.fetch);
}

const API = new api();
export default API;

export { initApi };
