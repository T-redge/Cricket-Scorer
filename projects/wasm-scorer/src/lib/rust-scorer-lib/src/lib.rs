use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn load_teamone_file() -> Vec<String> {
    let team = vec![
        "Alex Tredgett".to_string(),
        "Luke Andrews".to_string(),
        "Brent Clutterbuck".to_string(),
        "Bryce Johnson".to_string(),
        "Callum Lloyd-Watters".to_string(),
        "David Moir".to_string(),
        "Gerhard Rautenbach".to_string(),
        "Joshua Hyland".to_string(),
        "Saad Rehan".to_string(),
        " Sam Inglis".to_string(),
        "Tapiwanashe Chisango".to_string(),
        "Wade McMahon".to_string(),
    ];
    team
}
#[wasm_bindgen]
pub fn load_teamtwo_file() -> Vec<String> {
    let team = vec![
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
