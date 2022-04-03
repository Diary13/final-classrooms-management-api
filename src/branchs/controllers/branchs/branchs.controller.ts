import { Body, Controller, Get, Param, Patch, Post, Delete, Put, Query } from '@nestjs/common';
import { BranchsService } from 'src/branchs/services/branchs/branchs.service';
import { CreateBranchsDto } from 'src/dto/create/create-branchs.dto';
import { UpdateBranchDto } from 'src/dto/update/update-branch.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('branchs')
@Controller('branchs')
export class BranchsController {

    constructor(private branchService: BranchsService) { }

    @Post()
    public create(@Body() branch: CreateBranchsDto) {
        try {
            return this.branchService.create(branch);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Get('/all')
    public async findAll(): Promise<any> {
        try {
            return await this.branchService.findAll();
        } catch (error) {
            throw error;
        }
    }

    @Get('/all/department')
    public async findAllByDepartment(@Query('department') department: string): Promise<any> {
        try {
            return await this.branchService.findAllByDepartment(department);
        } catch (error) {
            throw error;
        }
    }

    @Get('find/one/:branch')
    findByName(@Param('branch') branch: string) {
        try {
            return this.branchService.findByName(branch);
        } catch (error) {
            throw error;
        }
    }

    @Put('/update/:id')
    public async update(@Param('id') id: string, @Body() newBranch: UpdateBranchDto) {
        try {
            return await this.branchService.update(id, newBranch);
        } catch (error) {
            throw error;
        }
    }

    @Delete('/one/:id')
    public async delete(@Param('id') id: string) {
        try {
            return await this.branchService.delete(id);
        } catch (error) {
            throw error;
        }
    }
}
