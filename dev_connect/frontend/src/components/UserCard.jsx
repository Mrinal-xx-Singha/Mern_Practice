import React from "react";

const UserCard = ({ user }) => {
  console.log(user);
  const { firstName, lastName, photoUrl, age, gender, skills, about } = user;

  return (
    <div className="card bg-base-200 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="UserPicture" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}

        <p>{about}</p>
        <div className="card-actions justify-between my-4">
          <button className="btn btn-error text-primary-content">Ignore ❌</button>
          <button className="btn btn-primary text-primary-content ">
            Interested 💚
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
