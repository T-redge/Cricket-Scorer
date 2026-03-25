use tokio_postgres::{tls::NoTlsStream, Client, Connection, Error, NoTls, Socket};

#[derive(serde::Serialize)]
pub struct Team {
    pub id: i32,
    pub name: String,
}
async fn connect_db(
    ip: &str,
    user: &str,
    password: &str,
) -> Result<(Client, Connection<Socket, NoTlsStream>), Error> {
    let config = String::from(
        "host=".to_string()
            + ip
            + " user="
            + user
            + " password="
            + password
            + " dbname=tredge_scorer",
    );
    let (client, connection) = tokio_postgres::connect(&config, NoTls).await?;

    Ok((client, connection))
}
#[tauri::command]
pub async fn get_team_names() -> Result<Vec<Team>, String> {
    let (client, conn) = connect_db().await.map_err(|err| err.to_string())?;

    tokio::spawn(async move {
        if let Err(e) = conn.await {
            eprintln!("connection error: {}", e);
        }
    });

    let query = client
        .query("SELECT team_id, team_name FROM teams", &[])
        .await
        .map_err(|err| err.to_string())?;

    let mut t: Vec<Team> = Vec::new();
    for row in query {
        let value: Team = Team {
            id: row.get(0),
            name: row.get(1),
        };
        t.push(value);
    }
    Ok(t)
}
