STAGECONFIG = YAML.load_file(Rails.root.join('config/stages.yml'))
STAGES = STAGECONFIG['stages']
COURSES = STAGECONFIG['courses']
PROGRAMS = STAGECONFIG['programs'].transform_values do |program|
  program['terms'].each do |term|
    program[term]['courses'] = program[term]['courses'].map do |course|
      course_hash = { :course => course }
      if COURSES[course].nil?
        raise "Could not find #{course} in COURSES\n"
      end
      course_hash.merge(COURSES[course])
    end
  end

  program
end

class StageController < ApplicationController
  protect_from_forgery with: :null_session
  def index
    stages = STAGES.clone.map do |stage|
      stage = stage.clone
      if stage['type'] == 'programview' or stage['type'] == 'programdesign'
        stage['program'] = PROGRAMS[stage['program']].clone
      end
      
      stage
    end
    render json: stages
  end

  def get
    # DEPRECATED - try not to use
    render json: STAGES[params[:num]]
  end

  def put
    if STAGES[params[:num].to_i].nil?
      render status: 404
    end

    if STAGES[params[:num].to_i]['type'] == 'ident'
      v = Voter.new(params.require(:stage).permit(:cls, :name, :email, :current, :reason))
      v.save

      render json: {:uuid => v.uuid}
    else
      # Handle other stages
      v = Voter.find_by! uuid: params[:voterKey]

      s = StageResponse.new
      s.voter_id = v.id
      s.stage = params[:num].to_i
      s.stagetype = STAGES[params[:num].to_i]['type']

      s.save

      if s.stagetype == 'questions'
        params[:stage][:questions].each_with_index do |ans, idx|
          question = Question.new
          question.stage_response_id = s.id
          question.question = idx
          question.answer = ans

          question.save
        end
      end

      render json: {:success => true}
    end
  end
end
