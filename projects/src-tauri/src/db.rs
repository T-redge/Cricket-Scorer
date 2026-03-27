use tokio_postgres::{tls::NoTlsStream, Client, Connection, Error, NoTls, Socket};
#[derive(serde::Serialize)]
pub struct Player {
    pub id: i32,
    pub name: String,
}
#[derive(serde::Serialize)]
pub struct Team {
    pub id: i32,
    pub name: String,
}
pub async fn connect_db(config: &str) -> Result<(Client, Connection<Socket, NoTlsStream>), Error> {
    let (client, connection) = tokio_postgres::connect(config, NoTls).await?;

    Ok((client, connection))
}
#[tauri::command]
pub async fn get_team_names() -> Result<Vec<Team>, String> {
    let host = "host=localhost";
    let user = "user=alex";
    let db_name = "dbname=tredge_scorer";
    let config = host.to_string() + " " + user + " " + db_name;
    let (client, conn) = connect_db(&config).await.map_err(|err| err.to_string())?;

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
#[tauri::command]
pub async fn get_team_players(team_id: i32) -> Result<Vec<Player>, String> {
    let host = "host=localhost";
    let user = "user=alex";
    let db_name = "dbname=tredge_scorer";
    let config = host.to_string() + " " + user + " " + db_name;

    let (client, conn) = connect_db(&config).await.map_err(|err| err.to_string())?;

    tokio::spawn(async move {
        if let Err(e) = conn.await {
            eprintln!("connection error: {}", e);
        }
    });

    let query = client
        .query(
            "SELECT player_id, full_name FROM players WHERE players.team_id = $1",
            &[&team_id],
        )
        .await
        .map_err(|err| err.to_string())?;

    let mut list: Vec<Player> = Vec::new();
    for row in query {
        let player: Player = Player {
            id: row.get(0),
            name: row.get(1),
        };
        list.push(player);
    }
    Ok(list)
}
