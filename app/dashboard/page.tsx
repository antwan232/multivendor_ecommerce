// Auth utility
import { protectRoute } from "@/actions/user";

export default async function DashboardPage() {
	await protectRoute("USER");
}