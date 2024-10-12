export interface IDashboard {
    commandsRan: number;
    users: number;
    servers: number;
    songsPlayed: number;
}

export const getDashboard: () => Promise<IDashboard> = () => {
    return new Promise(async (resolve, _reject) => {
        let data = await fetch("/api/dashboard", {
            method: "GET",
	    credentials: "same-origin",
        });
        let json = await data.json();
        resolve(json);
    })
}

export async function login(username: string, password: string) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}
