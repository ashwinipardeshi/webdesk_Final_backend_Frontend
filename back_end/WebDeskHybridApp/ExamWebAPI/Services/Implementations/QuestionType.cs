using ExamWebAPI.Models;

namespace ExamWebAPI.Services.Implementations
{
        public class QuestionType : ObjectType<Question>
        {
            protected override void Configure(IObjectTypeDescriptor<Question> descriptor)
            {
                descriptor.Field(q => q.Id).Type<NonNullType<IntType>>();
                descriptor.Field(q => q.Question1).Type<NonNullType<StringType>>();
                descriptor.Field(q => q.ExamId).Type<NonNullType<IntType>>();
            }
        }
}
