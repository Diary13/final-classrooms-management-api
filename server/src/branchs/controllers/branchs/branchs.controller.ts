import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { throwError } from 'rxjs';
import { BranchsService } from 'src/branchs/services/branchs/branchs.service';
import { CreateBranchsDto } from 'src/dto/create/create-branchs.dto';
import { UpdateBranchDto } from 'src/dto/update/update-branch.dto';
import { ApiTags } from '@nestjs/swagger';

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
    @Patch('/update/:id')
    public async update(@Param('id') id: string, @Body() newBranch: UpdateBranchDto) {
        try {
            return await this.branchService.update(id, newBranch);
        }
        catch (error) {
            throw error;
        }
    }
    @Delete('/one/:id')
    public async delete(@Param('id') id: string) {
        try {
            return await this.branchService.delete(id);
        }
        catch (error) {
            throw error;
        }
    }

}
