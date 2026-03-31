use db_access::db::{Player, Team, get_team_names, get_team_players};
use serde::{Deserialize, Serialize};
use serde_json::json;

use tokio::{
    io::{AsyncReadExt, AsyncWriteExt},
    net::TcpListener,
};
#[derive(Serialize, Deserialize, Debug)]
struct TeamInterface {
    id: i32,
    name: String,
}
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let listener = TcpListener::bind("localhost:8989").await?;

    loop {
        let (mut socket, _) = listener.accept().await?;

        tokio::spawn(async move {
            let mut buf = [0; 1024];

            let _n = match socket.read(&mut buf).await {
                Ok(0) => {
                    return;
                }
                Ok(n) => n,
                Err(e) => {
                    eprintln!("Failed to read from socket; err = {:?}", e);
                    return;
                }
            };

            let a: Vec<String> = buf.utf8_chunks().map(|x| x.valid().to_string()).collect();

            let mut line = String::new();
            let mut request: Vec<String> = Vec::new();

            for c in a[0].chars() {
                if c != '\n' {
                    line.push(c);
                } else {
                    let new_line = line.trim_ascii().to_string();
                    request.push(new_line);
                    line.clear();
                }
            }
            let request_line = request.get(0).unwrap() as &str;
            let (status_line, content) = match request_line {
                "GET /?teams= HTTP/1.1" => {
                    let status = "HTTP/1.1 200 OK";
                    let value = get_team_names().await.unwrap();

                    (status, json!(value))
                }
                "GET /?team=1 HTTP/1.1" => {
                    let status = "HTTP/1.1 200 OK";

                    let id = request_line.to_string().remove(11);

                    let id = id.to_digit(10).unwrap() as i32;

                    let value = get_team_players(id).await.unwrap();

                    (status, json!(value))
                }
                "GET /?team=2 HTTP/1.1" => {
                    let status = "HTTP/1.1 200 OK";

                    let id = request_line.to_string().remove(11);

                    let id = id.to_digit(10).unwrap() as i32;

                    let value = get_team_players(id).await.unwrap();

                    (status, json!(value))
                }

                _ => {
                    let status = "HTTP/1.1 400 NOT FOUND";
                    let value: Vec<Team> = Vec::new();
                    (status, json!(value))
                }
            };
            let content_type = "Content-Type: application/json";
            let connection = "Connection: Closed";
            let cor = "Access-Control-Allow-Origin: http://localhost:4200";
            let response_line = format!(
                "{status_line}\r\n{cor}\r\n{content_type}\r\n{connection}\r\n\r\n{content}"
            );

            if let Err(e) = socket.write(response_line.as_bytes()).await {
                eprintln!("Error = {e:?}");
                return;
            };
            socket.flush().await.unwrap();
        })
        .await?;
    }
}

/*async fn handle_connection(mut stream: tokio::net::TcpStream) {
    let buf_reader = BufReader::new(&stream);
    let request_line = buf_reader.lines().next().unwrap().unwrap();

    let (status_line, content) = match request_line.as_str() {
        "GET /?teams= HTTP/1.1" => {
            let status = "HTTP/1.1 200 OK";
            let value = get_team_names().await.unwrap();

            (status, json!(value))
        }
        _ => {
            let status = "HTTP/1.1 400 OK";
            let value = json!([" ", " "]);
            (status, value)
        }
    };
    let cor = "Access-Control-Allow-Origin: http://localhost:4200";

    let data = format!("{status_line}\r\n{cor}\r\n\r\n{content}");

    stream.write_all(data.as_bytes()).unwrap();
}*/
