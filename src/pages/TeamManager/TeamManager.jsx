import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

function TeamManager() {
  const [teams, setTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  const { user, loading } = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    const storedTeams = JSON.parse(localStorage.getItem('teams')) || [];
    setTeams(storedTeams);
  }, []);

  useEffect(() => {
    localStorage.setItem('teams', JSON.stringify(teams));
  }, [teams]);

  const createTeam = () => {
    if (!user || !newTeamName) return;

    const newTeam = {
      id: Date.now().toString(),
      name: newTeamName,
      members: [user.email],
    };

    setTeams((prevTeams) => [...prevTeams, newTeam]);
    setNewTeamName('');
  };

  const inviteUser = () => {
    if (!user || !inviteEmail || inviteEmail === user.email) return;

    const invitedUser = teams.find((team) => team.members.includes(inviteEmail));
    if (!invitedUser) {
      alert('User not found in any team');
      return;
    }

    const teamToUpdate = teams.find((team) => team.id === invitedUser.id);
    if (!teamToUpdate) return;

    if (!teamToUpdate.members.includes(user.email)) {
      alert('You are not a member of this team');
      return;
    }

    teamToUpdate.members.push(inviteEmail);

    setTeams([...teams]);
    setInviteEmail('');
  };

  return (
    <div className="w-3/5 mx-auto p-4">
      {loading ? (
        <h1>Loading...</h1>
      ) : user ? (
        <div>
          <h1 className="text-2xl mb-4">Welcome, {user.email}!</h1>
          <h2 className="text-lg font-semibold mb-2">Your Teams:</h2>
          <ul className="list-disc pl-4">
            {teams.map((team) => (
              <li key={team.id}>{team.name}</li>
            ))}
          </ul>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Create a New Team</h3>
            <div className="flex">
              <input
                type="text"
                placeholder="Team Name"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                className="border rounded-md p-2 mr-2"
              />
              <button
                onClick={createTeam}
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Create Team
              </button>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Invite a User</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="User Email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="border rounded-md p-2 mr-2"
              />
              <button
                onClick={inviteUser}
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Invite User
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Please sign in to use the Team Manager</h1>
        </div>
      )}
    </div>
  );
}

export default TeamManager;
