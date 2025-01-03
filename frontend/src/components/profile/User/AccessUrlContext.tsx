import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface ProfileContextType {
    url: string | undefined; 
    setUrl: (url:string) => void
    targetUserId:string|null|undefined
}

export const AccessUrlContext = createContext<ProfileContextType | undefined>(undefined);

export const AccessUrlProvider: React.FC<{ children: ReactNode;type:String,TargetUserId?:string|null,userId:string|null|undefined}> = ({ children,type ,TargetUserId,userId}) => {
  let url=""
  const [currentUrl, setUrl] = useState<string>();

  useEffect(()=>{
    if(type==="profile")
      {
        url = `http://localhost:5000/api/v1/post/getpostsbyuserid?targetId=${TargetUserId}&userAccessId=${userId}`;
      } else 
      { 
        url = `http://localhost:5000/api/v1/post/getposthome/${userId}`;
      }
    setUrl(url)    
  },[TargetUserId])
  
    return (
      <AccessUrlContext.Provider value={{ url: currentUrl,setUrl:setUrl,targetUserId:TargetUserId}}>
        {children}
      </AccessUrlContext.Provider>
    );
  };
