import { invoke } from '@tauri-apps/api/core';

export interface TeamInterface {
  id: number,
  name: string,
}
export async function fetch_from_db(): Promise<Array<TeamInterface> | undefined> {
  try {
    const result = await invoke("get_team_names");

    const teamArray = result as Array<TeamInterface>;
    return teamArray;
  } catch (error) {
    return undefined;
  }
}
