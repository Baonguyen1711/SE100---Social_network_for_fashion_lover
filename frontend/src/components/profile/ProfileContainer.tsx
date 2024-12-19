import { Avatar, Button, Icon } from "@mui/material";

const ProfileContainer = () => {
  return (
    <div className="container">
      <div>
        <Avatar />
      </div>
      <div className="containerRight">
        <div className="containerRight_Top">
          <h1>Trịnh Xuân Thanh</h1>
          <Button>Edit your profile</Button>
        </div>
        <div className="containerRight_Bottom">
          <div>
            <div className="sectionSenInfo">Description</div>
            <div className="sectionSenDetails">
              I love dog. I have take care experience for 5 years
            </div>
          </div>
          <div>
            <div className="sectionSenInfo">Living</div>
            <div className="sectionSenDetails">
              TP Hồ Chí Minh
            </div>
          </div>
          <div>
            <div className="sectionBoss">My pets</div>
            <div className="sectionBossAMount">
                <div className="BossIcon">
                    <img src="" alt="" />
                    <h5>1</h5>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
