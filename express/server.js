import http from "node:http";
import { URL } from "node:url";

let users = [
  { id: 1, name: "santhosh" },
  { id: 2, name: "gowthami" },
  { id: 3, name: "chaitanya" },
  { id: 4, name: "adithya" }
];

const port = 5009;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  const path = url.pathname;


  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === "GET") {
    if (path === "/api/users") {
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(JSON.stringify(users));
    }

    if (path.startsWith("/api/user/") || path.startsWith("/api/users/")) {
      const id = path.split("/")[3];
      const user = users.find((u) => u.id == id);

      if (!user) {
        res.writeHead(404, { "content-type": "application/json" });
        return res.end(JSON.stringify({ error: "User Not Found" }));
      }

      res.writeHead(200, { "content-type": "application/json" });
      return res.end(JSON.stringify(user));
    }

    res.writeHead(404, { "content-type": "application/json" });
    return res.end(JSON.stringify({ error: "Page Not Found" }));
  }


  if (req.method === "POST" && path === "/api/users") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);

        if (!parsed.name) {
          res.writeHead(400, { "content-type": "application/json" });
          return res.end(JSON.stringify({ error: "Name is required" }));
        }

        if (parsed.id) {
          const userIndex = users.findIndex((u) => u.id == parsed.id);

          if (userIndex !== -1) {
            users[userIndex].name = parsed.name;
            res.writeHead(200, { "content-type": "application/json" });
            return res.end(JSON.stringify(users[userIndex]));
          }
        }

        const newId = parsed.id ? Number(parsed.id) : users.length + 1;
        const newUser = { id: newId, name: parsed.name };
        users.push(newUser);

        res.writeHead(201, { "content-type": "application/json" });
        return res.end(JSON.stringify(newUser));
      } catch (err) {
        res.writeHead(400, { "content-type": "application/json" });
        return res.end(JSON.stringify({ error: "Invalid JSON format" }));
      }
    });

    return;
  }

  res.writeHead(404, { "content-type": "application/json" });
  res.end(JSON.stringify({ error: "Route Not Found" }));
});

server.listen(port, () => {
  console.log(`Server is listening to Port : ${port}`);
});
