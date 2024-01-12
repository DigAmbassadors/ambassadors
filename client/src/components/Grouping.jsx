import { useEffect, useState } from 'react';
import Header from './Header';
import Button from '@mui/material/Button';
import '../assets/style/grouping.css';
import { useAuth } from '../contexts/AuthContext';

const Grouping = () => {
	// 汎用フックス-------------------------------
	const { userId } = useAuth();

	//url定義-----------------------------------------------------------------
	let url;
	if (import.meta.env.VITE_NODE_ENV === 'production') {
		url = 'https://ambassadors-btc5.com';
	} else {
		url = 'http://localhost:3000';
	}

	// 新規グループ作成-------------------------------
	const [newName, setNewName] = useState('');
	const createGroup = async () => {
		//判定
		if (!newName) {
			console.log('未入力だよ');
			window.alert('入力内容に不備があるよ！');
			return;
		}

		// fetch
		const response = await fetch(url + '/api/newgroup', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				groupName: newName,
			}),
		});

		if (response.ok) {
			getJoinedGroup();
			window.alert('登録しました！');
		} else {
			window.alert('登録に失敗しました！');
		}
	};

	// 既存グループに参加-----------------------------
	const [joiningId, setJoiningId] = useState('');
	const [joiningPass, setJoiningPass] = useState('');
  const joiningGroup = async() => {
    try{
      const response = await fetch(url + '/api/joingroup', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          groupId: joiningId,
          groupPass: joiningPass,
        }),
      });
  
      if (response.ok) {
        getJoinedGroup();
        window.alert('参加しました！');
      } else {
      }
    }catch(error){
      console.log(error);
    }
  }


	// 参加済みチーム -------------------------------
	const [joined, setJoined] = useState([]);

	const getJoinedGroup = async () => {
		try {
			const response = await fetch(url + `/api/groups/${userId}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
			});

			if (!response.ok) {
				window.alert('取得に失敗しました！');
			}

			const data = await response.json();
			setJoined(data);
		} catch (error) {
			console.log('error', error);
		}
	};

	useEffect(() => {
		getJoinedGroup();
	}, []);

	return (
		<div>
			<Header show={true} />

			<div className='newGroup'>
				<div>
					<h2>チームを作成</h2>
					<Button variant='contained' onClick={createGroup}>
						作成
					</Button>
				</div>
				<div>
					<input type='text' placeholder='新チーム名' onChange={(e) => setNewName(e.target.value)} />
				</div>
			</div>

			<div className='joiningGroup'>
				<div>
					<h2>チームに参加</h2>
					<Button variant='contained' onClick={joiningGroup}>
						参加
					</Button>
				</div>
				<div>
					<input type='text' placeholder='チームID' onChange={(e) => setJoiningId(e.target.value)} />
				</div>
				<div>
					<input type='text' placeholder='pass' onChange={(e) => setJoiningPass(e.target.value)} />
				</div>
			</div>

			<div className='joinedGroup'>
				<h2>参加済みチーム</h2>
				{joined.map((group, idx) => (
					<div key={idx}>
						<p className='groupName'>{group.name}</p>
						<p>ID  : {group.id}</p>
						<p>Pass: {group.pass}</p>
					</div>
				))}
			</div>
		</div>
	);
};
export default Grouping;
