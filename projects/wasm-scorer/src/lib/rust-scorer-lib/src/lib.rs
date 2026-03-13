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
