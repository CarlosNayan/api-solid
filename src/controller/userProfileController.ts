import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfileService } from "../factories/makeFactorieUsers";

const userProfileService = makeGetUserProfileService();

export default async function Profile(req: FastifyRequest, res: FastifyReply) {
  const id_user = req.user.sub;

  const userProfile = await userProfileService.GetProfileUserById({ id_user });

  return res.status(200).send({
    user: {
      id_user: userProfile.id_user,
	  user_name: userProfile.user_name
    },
  });
}
