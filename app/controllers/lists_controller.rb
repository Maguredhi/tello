class ListsController < ApplicationController
  before_action :set_list, only: %i[ update destroy move]
  before_action :authenticate_user!

  def index
    @lists = current_user.lists
  end

  def move
    # act_as_links 的語法 insert_at，要把 data 塞到哪個地方
    @list.insert_at(list_params[:position].to_i)
    render 'show.json'
  end

  def create
    @list = current_user.lists.new(list_params)

    respond_to do |format|
      if @list.save
        format.html { redirect_to @list, notice: "List was successfully created." }
        format.json { render :show, status: :created, location: @list }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @list.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @list.update(list_params)
        format.html { redirect_to @list, notice: "List was successfully updated." }
        format.json { render :show, status: :ok, location: @list }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @list.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @list.destroy
    respond_to do |format|
      format.html { redirect_to lists_url, notice: "List was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    def set_list
      @list = current_user.lists.find(params[:id])
    end


    def list_params
      params.require(:list).permit(:name, :position)
    end
end
