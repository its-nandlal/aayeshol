import { Controller, Get, Session } from '@nestjs/common';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { UsersService } from 'src/users/users.service';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardServices: DashboardService,
    private readonly userService: UsersService,
  ) {}

  //   {
  // 	"success": true,
  // 	"data": {
  // 		"publishedPosts": 25,
  // 		"draftPosts": 1,
  // 		"failedPosts": 0,
  // 		"connectedAccount": 1
  // 	},
  // 	"message": "Post status fetched successfully"
  // }

  @Get('status')
  async getStatus(@Session() session: UserSession) {
    const userId = session.user.id;
    if (!userId) return { success: false, error: 'Unauthorized request' };

    const verifyUser = await this.userService.userExistingVerify(userId);
    if (!verifyUser.success)
      return {
        success: false,
        message: verifyUser.message,
        error: `${verifyUser.message} Unauthorized access.`,
      };

    const status = await this.dashboardServices.getPostStatus(userId);
    return {
      success: true,
      data: { ...status },
      message: 'Post status fetched successfully',
    };
  }

  @Get('chart')
  async getChart(@Session() session: UserSession) {
    const userId = session.user.id;
    if (!userId) return { success: false, error: 'Unauthorized request' };

    const verifyUser = await this.userService.userExistingVerify(userId);
    if (!verifyUser.success)
      return {
        success: false,
        message: verifyUser.message,
        error: `${verifyUser.message} Unauthorized access.`,
      };

    const chart = await this.dashboardServices.getChartData(userId);
    return {
      success: true,
      data: { ...chart },
      mesage: 'Chart data fetched successfully',
    };
  }

  @Get('activity')
  async getActivity(@Session() session: UserSession) {
    const userId = session.user.id;
    if (!userId) return { success: false, error: 'Unauthorized request' };

    const verifyUser = await this.userService.userExistingVerify(userId);
    if (!verifyUser.success)
      return {
        success: false,
        error: ` ${verifyUser.message} unasasrey request`,
      };

    const activityes = await this.dashboardServices.getActivity(userId);
    return {
      success: true,
      data: { ...activityes },
      message: 'Activites fetched successfully',
    };
  }
}
