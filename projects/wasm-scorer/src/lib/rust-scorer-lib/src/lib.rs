use tokio;
use tokio_postgres::{Error, NoTls};
use wasm_bindgen::prelude::wasm_bindgen;
fn return_edgewater() -> Vec<String> {
    let team: Vec<String> = vec![
        "Alex Tredgett".to_string(),
        "Luke Andrews".to_string(),
        "Brent Clutterbuck".to_string(),
        "Bryce Johnson".to_string(),
        "Callum Lloyd-Watters".to_string(),
        "David Moir".to_string(),
        "Gerhard Rautenbach".to_string(),
        "Joshua Hyland".to_string(),
        "Saad Rehan".to_string(),
        "Sam Inglis".to_string(),
        "Tapiwanashe Chisango".to_string(),
        "Wade McMahon".to_string(),
    ];
    team
}
fn return_morley() -> Vec<String> {
    let team: Vec<String> = vec![
        "Caelan Fagence".to_string(),
        "Ian Huntly".to_string(),
        "Jacob Cavanagh".to_string(),
        "Jason Gliddon".to_string(),
        "Jason Meleka".to_string(),
        "Joshua Burton".to_string(),
        "Matthew Owens".to_string(),
        "Phillip Singh".to_string(),
        "Terence Moss".to_string(),
        "Travis Radoccia".to_string(),
        "Veeru Singh".to_string(),
        "Zane Gordon".to_string(),
    ];
    team
}
#[wasm_bindgen]
pub fn load_teamfile(team_name: &str) -> Vec<String> {
    let name = team_name.trim();

    let team = match name {
        "Edgewater" => return_edgewater(),
        "Morley" => return_morley(),
        _ => todo!(),
    };

    team
}
pub async fn fetch_team_names() -> Result<Vec<String>, Error> {
    //connect to db
    let (client, connection) =
        tokio_postgres::connect("host=localhost dbname=tredge_scorer", NoTls).await?;
    let mut res: Vec<String> = Vec::new();
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("connection error: {}", e);
        }
    });
    //executes statement
    let query = client.query("SELECT * FROM teams", &[]).await?;

    for val in query {
        let data: &str = val.get(1);
        res.push(data.to_string());
    }

    return Ok(res);
}
#[test]
pub fn check_edgeteamfile() {
    let edge = "Edgewater";

    let edge_team = load_teamfile(edge);

    let test_edge = edge_team.get(11).unwrap();
    assert_eq!(test_edge, "Wade McMahon");
}
#[test]
pub fn check_morteamfile() {
    let mor = "Morley";
    let team = load_teamfile(mor);
    let test = team.get(11).unwrap();
    assert_eq!(test, "Zane Gordon");
}
#[tokio::test]
pub async fn test_fetch_team_names() {
    let value = fetch_team_names().await.unwrap();
    let team_one = value.get(0).unwrap().to_string();
    let team_two = value.get(1).unwrap().to_string();
    assert_eq!(team_one, "Edgewater");
    assert_eq!(team_two, "Morley");
}
