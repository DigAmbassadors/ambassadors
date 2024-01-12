import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/style/map.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Registrations = (props) => {
  const { selectedPosition } = props;
  const navigate = useNavigate();

  //url定義-----------------------------------------------------------------
  let url;
  if (import.meta.env.VITE_NODE_ENV === 'production') {
    url = 'https://ambassadors-btc5.com';
  } else {
    url = 'http://localhost:3000';
  }

  // スポット名---------------------------------------------------------------
  const [spotName, setSpotName] = useState(false);

  // テーマ選択欄を作成--------------------------------------------------------
  const [areas, setAreas] = useState(['']);
  useEffect(() => {
    const getFetch = async () => {
      try {
        const response = await fetch(url + `/api/areas`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (!response.ok) {
          console.error('Network response was not ok');
          return;
        }

        const areas = await response.json();
        areas.unshift('新テーマ名を記入');
        if (areas.length > 0) {
          setAreas(areas);
          setSelectedArea(areas[0]);
        }
      } catch (error) {
        console.error('Error during get trips:', error);
        return;
      }
    };
    getFetch();
  }, []);

  const makeAreaSelect = () => {
    return (
      <select value={selectedArea} onChange={handleAreaChange}>
        {areas.map((area, idx) => (
          <option key={idx} value={area}>
            {area}
          </option>
        ))}
      </select>
    );
  };

  // 選択されたテーマを検知
  const [selectedArea, setSelectedArea] = useState(false);
  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    if (e.target.value === '新テーマ名を記入') {
      setNewName(false);
    }
  };

  // 新テーマ名の入力欄
  const [newName, setNewName] = useState(false);

  // ミッション２-----------------------------------------------------------------
  const [mission2, setMission2] = useState(false);

  // 画像選択-----------------------------------------------------------------
  const [spotPhoto, setSpotPhoto] = useState('');
  const refPhoto = React.useRef();
  const handleClickPhoto = () => refPhoto.current.click();
  const handleSetPhoto = (e, setfunc) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxSize = 400; // 最大サイズ
          let width = img.width;
          let height = img.height;

          // アスペクト比を保持しながらサイズを調整
          if (width > height && width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          } else if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          setfunc(canvas.toDataURL()); // DataURLを設定
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // 登録ボタン---------------------------------------------------------------
  const handleSubmit = async () => {
    // テーマ名を検出
    let areaFinal = false;
    if (selectedArea === '新テーマ名を記入') {
      areaFinal = newName;
    } else {
      areaFinal = selectedArea;
    }

    //未入力チェック
    console.log('スポット名', spotName);
    console.log('テーマ選択', areaFinal);
    console.log('ミッション２', mission2);
    console.log('画像', spotPhoto ? true : false);
    console.log('緯度経度', selectedPosition);
    if (!spotName || !areaFinal || !spotPhoto) {
      console.log('未入力だよ');
      window.alert('入力内容に不備があるよ！');
      return;
    }

    //送信
    try {
      const response = await fetch(url + '/api/newspot', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: spotName,
          area: areaFinal,
          mission: mission2,
          photo: spotPhoto,
          longitude: selectedPosition.lng,
          latitude: selectedPosition.lat,
        }),
      });

      if (response.ok) {
        window.alert('登録しました！');
        navigate('/usertop');
      } else {
        window.alert('登録に失敗しました！');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //表示 --------------------------------------------------------------------
  return (
    <div>
      <section>
        <p>・スポット名</p>
        <input type="text" onChange={(e) => setSpotName(e.target.value)} />
      </section>

      <section>
        <p>・テーマ選択</p>
        {makeAreaSelect()}
        {selectedArea === '新テーマ名を記入' && (
          <input
            type="text"
            placeholder="新テーマ名"
            onChange={(e) => setNewName(e.target.value)}
          />
        )}
      </section>

      <section>
        <p>・ミッション２</p>
        <input type="text" onChange={(e) => setMission2(e.target.value)} />
      </section>

      <section>
        <p>・スポット写真</p>

        <div className="vertical-photo-button">
          <Button variant="contained" onClick={handleClickPhoto}>
            <Typography style={{ fontFamily: 'Yusei Magic' }}>
              画像を選択
            </Typography>
          </Button>
        </div>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={refPhoto}
          onChange={(e) => handleSetPhoto(e, setSpotPhoto)}
        />
        {spotPhoto && (
          <img className="spotImg" src={spotPhoto} alt="スポット写真"></img>
        )}
      </section>

      <div className="vertical-submit-button">
        <Button variant="contained" onClick={handleSubmit}>
          <Typography style={{ fontFamily: 'Yusei Magic' }}>
            上記の内容で保存する
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default Registrations;
