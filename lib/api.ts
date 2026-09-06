import { Player, Team } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return res;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error("Request timeout. Silakan periksa koneksi internet Anda.");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function searchPlayers(name: string): Promise<Player[]> {
  const trimmed = name.trim();
  if (!trimmed) return [];

  try {
    const res = await fetchWithTimeout(`${BASE_URL}/searchplayers.php?p=${encodeURIComponent(trimmed)}`);
    const data = await res.json();
    return data.player || [];
  } catch (error) {
    console.error(`Error searching players for "${trimmed}":`, error);
    throw new Error("Gagal mengambil data pemain dari TheSportsDB. Silakan coba lagi.");
  }
}

export async function getPlayerById(id: string): Promise<Player | null> {
  const trimmedId = id.trim();
  if (!trimmedId) return null;

  try {
    const res = await fetchWithTimeout(`${BASE_URL}/lookupplayer.php?id=${encodeURIComponent(trimmedId)}`);
    const data = await res.json();
    return data.players && data.players.length > 0 ? data.players[0] : null;
  } catch (error) {
    console.error(`Error fetching player by id ${trimmedId}:`, error);
    throw new Error("Gagal memuat detail pemain. Silakan coba beberapa saat lagi.");
  }
}

export async function getPlayersByTeam(teamId: string): Promise<Player[]> {
  const trimmedId = teamId.trim();
  if (!trimmedId) return [];

  try {
    const res = await fetchWithTimeout(`${BASE_URL}/lookup_all_players.php?id=${encodeURIComponent(trimmedId)}`);
    const data = await res.json();
    return data.player || [];
  } catch (error) {
    console.error(`Error fetching roster for team ${trimmedId}:`, error);
    throw new Error("Gagal memuat daftar pemain tim. Silakan coba beberapa saat lagi.");
  }
}

export async function searchTeams(name: string): Promise<Team[]> {
  const trimmed = name.trim();
  if (!trimmed) return [];

  try {
    const res = await fetchWithTimeout(`${BASE_URL}/searchteams.php?t=${encodeURIComponent(trimmed)}`);
    const data = await res.json();
    return data.teams || [];
  } catch (error) {
    console.error(`Error searching teams for "${trimmed}":`, error);
    throw new Error("Gagal mencari data klub. Silakan coba lagi.");
  }
}

export async function getTeamById(id: string): Promise<Team | null> {
  const trimmedId = id.trim();
  if (!trimmedId) return null;

  try {
    const res = await fetchWithTimeout(`${BASE_URL}/lookupteam.php?id=${encodeURIComponent(trimmedId)}`);
    const data = await res.json();
    return data.teams && data.teams.length > 0 ? data.teams[0] : null;
  } catch (error) {
    console.error(`Error fetching team by id ${trimmedId}:`, error);
    throw new Error("Gagal memuat informasi klub. Silakan coba beberapa saat lagi.");
  }
}
