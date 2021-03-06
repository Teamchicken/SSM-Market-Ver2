class Api::V1::CategoriesController < ActionController::API
  
  def index
    h = Hash.new
    results = Array.new
    @categories = Category.where(status: 'active').includes(:images)
    @categories.each do |c|
      results.push({id: c.id, name: c.name, url: c.images.first.url.url})
    end
    h[:categories] = results
    render json: h.as_json
  end
  
  def search_categories_by_name
    h = Hash.new
    results = Array.new
    # pg like
    @categories = Category.includes(:images).where("name ILIKE ?", "%#{params[:category_name]}%").where(status:'active')
    if @categories.size < 1
      render json: {errors: 'Not found'}, status: 404
    else
      @categories.each do |c|
        results.push({id: c.id, name: c.name, url: c.images.first.url.url})
      end
      h[:categories] = results
      render json: h.as_json
    end
  end
  
end