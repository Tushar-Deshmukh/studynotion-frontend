import { Button, Container } from "@mui/material";
import React from "react";
import { FaRegEdit } from "react-icons/fa";

export default function ViewProfile({profile,handleTypeChange}) {
    
  return (
    <div>
      <p className="text-30">My Profile</p>

      <Container maxWidth="md" className="mt-8">
        <div className="grid grid-cols-12 gap-2 p-4 border border-borderGray rounded-lg bg-coolgray">
          <div className="col-span-9">
            <div className="flex justify-start items-center gap-4">
              <img
                src={profile?.profileImage}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-18">{`${profile?.firstName} ${profile?.lastName}`}</p>
                <p className="text-textGray">{profile?.email}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-18">Personal Details</p>

              <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
                <div>
                  <p className="text-textGray">First Name</p>
                  <p>{profile?.firstName}</p>
                </div>

                <div>
                  <p className="text-textGray">Last Name</p>
                  <p>{profile?.lastName}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
                <div>
                  <p className="text-textGray">Email</p>
                  <p>{profile?.email}</p>
                </div>

                <div>
                  <p className="text-textGray">Phone Number</p>
                  <p>{profile?.mobileNumber}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <Button variant="contained" startIcon={<FaRegEdit />}
            onClick={() => handleTypeChange('edit')}
            >
              Edit
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
