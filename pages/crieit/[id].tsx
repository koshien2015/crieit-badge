import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const CrieitId = () =>{
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState(null);
    useEffect(()=>{
        const f = async() => {
            if(id !== undefined){
                const response = await fetch('/api/crieit/'+id);
                const data = await response.json();
                setData(data);    
            }
        }
        f();
    },[id])
    if(data === null){
        return<>loading...</>
    }
    return(
        <div
            id="main"
            style={{
                //backgroundColor:'#212529',
                //color:'white',
                padding:10,
                margin:0,
                position:'relative',
                //height:300,
                width:400
            }}
        >
            <div
                style={{
                    position:'absolute',
                    top:50,
                    fontSize:16
                }}
            >
                <div>経験値:&nbsp;&nbsp;{data.exp}</div>
                <div>今年の記事:&nbsp;&nbsp;{data.articles}</div>
            
            </div>
            <div
                style={{
                    //position:'absolute',
                    marginTop:100,
                    fontSize:14
                }}
            >
                {Object.keys(data.ranksObj).map((key)=>(
                    <span
                        style={{
                            display:'inline-block',
                            //backgroundColor:'grey',
                            borderRadius:3,
                            margin:5,
                            padding:3
                        }}
                        className={'rank rank'+data.ranksObj[key]}
                    >{key}
                        <span
                            style={{
                                backgroundColor:'black',
                                borderRadius:3,
                                margin:3,
                                padding:2,
                                fontSize:12
                            }}
                        >
                            {data.ranksObj[key]}位
                        </span>
                    </span>
                ))}
            </div>
            <img src='https://crieit.net/img/logo.png'
                style={{
                    position:'absolute',
                    opacity:0.5,
                    top:5,
                    left:0
                }}
            />
        </div>
    )
}
export default CrieitId;