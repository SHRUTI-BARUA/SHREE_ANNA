// import { useEffect, useState } from "react";
// // import { supabase } from "./supabaseClient";
// import { supabase } from "@/lib/supabase";
// function ProfileList() {
//   const [profiles, setProfiles] = useState<any>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         const { data, error } = await supabase.from("profiles").select("*");
//         if (error) throw error;
//         setProfiles(data || []);
//       } catch (err) {
//         console.log("Offline? Showing cached data...");
//         // fallback: load cached data from IndexedDB or localStorage
//         const cached = localStorage.getItem("profiles");
//         if (cached) setProfiles(JSON.parse(cached));
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfiles();
//   }, []);

//   useEffect(() => {
//     // cache data for offline use
//     if (profiles.length > 0) {
//       localStorage.setItem("profiles", JSON.stringify(profiles));
//     }
//   }, [profiles]);

//   if (loading) return <div>Loading...</div>;
//   return (
//     <ul>
//       {profiles.map((p) => (
//         <li key={p.id}>{p.name}</li>
//       ))}
//     </ul>
//   );
// }

// export default ProfileList;

// ProfileList.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Tell ESLint to ignore "unused variable" for this interface
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// interface Profile {
//   id: string;
//   name: string;
//   // other fields if needed
// }

function ProfileList() {
  const [profiles, setProfiles] = useState<Profile>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      const cached = localStorage.getItem("profiles");
      if (cached) {
        setProfiles(JSON.parse(cached));
        setLoading(false);
      }

      try {
        const { data, error } = await supabase.from<Profile>("profiles").select("*");
        if (error) throw error;

        setProfiles(data || []);
        localStorage.setItem("profiles", JSON.stringify(data));
      } catch {
        console.log("Offline or error fetching profiles, using cached data...");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <div>Loading profiles...</div>;
  if (profiles.length === 0) return <div>No profiles found.</div>;

  return (
    <ul>
      {profiles.map((profile) => (
        <li key={profile.id}>{profile.name}</li>
      ))}
    </ul>
  );
}

export default ProfileList;
