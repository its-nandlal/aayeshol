import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [DashboardController],
  providers: [DashboardService, UsersService],
})
export class DashboardModule {}
