#[cfg(test)]
mod tests {
    use crate::db::*;
    #[tokio::test]
    async fn test_db_connection() {
        let host = "host=localhost";
        let user = "user=alex";
        let db_name = "dbname=tredge_scorer";
        let config = host.to_string() + " " + user + " " + db_name;

        let conn = connect_db(&config).await;

        assert_eq!(conn.is_ok(), true);
    }

    #[tokio::test]
    async fn test_fetch_teams() {
        let teams = get_team_names().await.unwrap();

        let t1 = teams.get(0).unwrap();
        let t2 = teams.get(1).unwrap();

        assert_eq!(t1.id, 1);
        assert_eq!(t1.name, "Edgewater");

        assert_eq!(t2.id, 2);
        assert_eq!(t2.name, "Morley");
    }
    #[tokio::test]
    async fn test_fetch_team1_players() {
        let team_id: i32 = 1;
        let list = get_team_players(team_id).await;

        assert_eq!(list.is_ok(), true);

        let list = list.unwrap();
        let p1 = list.get(0).unwrap();
        let p11 = list.get(11).unwrap();
        assert_eq!(p1.name, "Alex Tredgett");
        assert_eq!(p11.name, "Wade McMahon");
    }
}
