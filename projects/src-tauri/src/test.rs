#[cfg(test)]
mod tests {
    use crate::db::*;

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
}
